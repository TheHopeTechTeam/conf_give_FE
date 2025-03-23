import { useEffect, useState } from "react";
import ConfAlertDialog from "./ConfAlertDialog";

const API_URL = "https://api.exchangerate-api.com/v4/latest/TWD";

interface ExchangeRateData {
    rates: {
        USD: number;
    };
}

const ExchangeRate = (amount: { value: number }) => {
    const [data, setData] = useState<ExchangeRateData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);

    // **設置 Alert **
    const handleOpenAlert = () => {
        setAlertOpen(true);
    };

    // **關閉 Alert **
    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    useEffect(() => {
        fetch(API_URL)
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>載入中...</p>;
    if (error) return <p>錯誤：{error}</p>;

    return (
        <div className="exchange-rate">
            {data &&
                <>
                    <p className="m-r-3 ">Equals {(amount.value * data?.rates?.USD).toFixed(2)} USD. </p>
                    <p className="disclaimer" onClick={handleOpenAlert}>Disclaimer</p>
                </>}
            <ConfAlertDialog
                open={alertOpen}
                title="Disclaimer"
                message='All exchange rates are reference rates only, the real time exchange rate will be confirmed upon transaction.'
                enMessage=''
                onClose={handleCloseAlert}
                cancelText="CLOSE"></ConfAlertDialog>
        </div>
    )
};

export default ExchangeRate;
