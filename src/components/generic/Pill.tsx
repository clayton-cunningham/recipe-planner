import "./generic.less";

export const Pill = (props: any) => {

    const classNameSuffix = props.className ? " " + props.className : "";

    return (
        <div className={"pill" + classNameSuffix} />
    )
}