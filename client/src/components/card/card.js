import "./card.scss";

export default function Card(props) {
    return <div className="card"
        style={{
            maxWidth: props.maxwidth ? props.maxwidth : "100%",
            minWidth: props.minwidth ? props.minwidth : "10%",
            width: props.width ? props.width : ""
        }}>
        {props.children}
    </div>;
}
