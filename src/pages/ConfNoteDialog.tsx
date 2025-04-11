import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface AddNoteDialogProps {
    open: boolean;
    title?: string;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
    onClose: () => void;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
    noteLength?: number
}


const ConfNoteDialog: React.FC<AddNoteDialogProps> = ({
    open,
    title = "Add Note 新增備註",
    onClose,
    onConfirm,
    cancelText = "CANCEL",
    confirmText = "SAVE",
    ...props
}) => {
    const { register, errors, noteLength = 0 } = props;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle className="dialog-title">{title}</DialogTitle>
            <DialogContent>
                <TextField
                    {...register("note")}
                    id="outlined-required"
                    className="width100 m-t-8 note"
                    type="text"
                    placeholder="Note 備註"
                    multiline
                    rows={9}
                    error={!!errors.note}
                    helperText={typeof errors.note?.message === 'string' ? errors.note?.message : undefined} />
                <p
                    className="note-alert"
                    style={{ color: noteLength > 200 ? "#E46962" : "rgba(40, 40, 41, 0.80)" }}
                >
                    {noteLength > 200
                        ?
                        <>
                            <p>Maximum character limit exceeded {noteLength}/200.</p>
                            <p>已超過字數上限 {noteLength}/200。</p>
                        </>
                        :
                        <>
                            <p>Maximum character limit is 200.</p>
                            <p>最多200字。</p>
                        </>}
                </p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} className="dialog-button">
                    {cancelText}
                </Button>
                <Button onClick={onConfirm} className="dialog-button">
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfNoteDialog;