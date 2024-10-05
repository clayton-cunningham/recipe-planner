import "./generic.less";

export const Row = (props: any) => {

    const {children} = props;
    const classNameSuffix = props.className ? " " + props.className : "";

    return (
        <div className={"row" + classNameSuffix}>
            {children}
        </div>
    )
}