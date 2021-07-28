import classes1 from "./alert.module.css";
import classes2 from "./alertStyle2.module.css";

const alert = (props) => {
    let classes = null;
    switch (props.style) {
        case ('2'): classes = classes2; break;
        default: classes = classes1; break;
    }
    const lower = String(props.msg).toLowerCase().replace('_', ' ');
    const msgText = lower.charAt(0).toUpperCase() + lower.slice(1);
    let msg = (
        <div className={classes.Alert} key={msgText}>{msgText}</div>
    );
    return msg;
}

export default alert;