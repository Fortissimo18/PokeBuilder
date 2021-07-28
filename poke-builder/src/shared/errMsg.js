import classes from "./errMsg.module.css";

const errMsg = (props) => {
    const lower = String(props.msg).toLowerCase().replace('_', ' ');
    const msgText = lower.charAt(0).toUpperCase() + lower.slice(1);
    let msg = (
        <p key={msgText} className={classes.ErrMsg} >{msgText}</p>
    );
    return msg;
}

export default errMsg;