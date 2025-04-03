import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface UploadProps {
    receiptType: string;
    upload: boolean;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
}

const Upload: React.FC<UploadProps> = (props) => {
    const { upload, register, errors, receiptType } = props;

    // 身份證驗證規則
    const NationalIDPattern = (idStr: string) => {
        const letters = "ABCDEFGHJKLMNPQRSTUVXYWZIO".split("");
        const multiply = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1];

        if (!/^[A-Z](1|2)\d{8}$/i.test(idStr)) {
            return "National ID invalid";
        };

        const firstChar = idStr.charAt(0).toUpperCase();
        const lastNum = parseInt(idStr.charAt(9), 10);
        const firstNum = letters.indexOf(firstChar) + 10;
        const nums = [Math.floor(firstNum / 10), firstNum % 10];

        let total = nums[0] * multiply[0] + nums[1] * multiply[1];
        for (let i = 2; i < multiply.length; i++) {
            total += parseInt(idStr.charAt(i - 1), 10) * multiply[i];
        };

        return (10 - (total % 10)) % 10 === lastNum || "National ID invalid";
    };

    return (
        <>
            {receiptType === "personal" && (
                <>
                    <FormControlLabel
                        className="checkbox-label-block"
                        control={
                            <Checkbox className="checkbox-custom" {...register("upload")} />
                        }
                        label={
                            <div className="label-custom">
                                <p className="label-chinese">需上傳國稅局 (台灣報稅需要)</p>
                                <p className="label-english">Need to submit taxes to Taiwan's IRS</p>
                            </div>
                        }
                        labelPlacement="end"
                    />

                    {upload && (
                        <div>
                            <p className="label-chinese">身分證字號</p>
                            <p className="label-english">National ID</p>
                            <TextField
                                id="outlined-required"
                                className="m-t-8 width100 basic-formControl"
                                {...register("nationalid", {
                                    required: upload && receiptType === "personal" ? "Required" : false,
                                    validate: NationalIDPattern,
                                })}
                                error={!!errors.nationalid}
                                helperText={
                                    typeof errors.nationalid?.message === "string"
                                        ? errors.nationalid?.message
                                        : undefined
                                }
                            />
                        </div>
                    )}
                </>
            )}
        </>

    );
};

export default Upload;