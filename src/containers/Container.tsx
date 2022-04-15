
interface Props {
  className?: string,
  children?: any
}

const Container = (props: Props) => {
  return <div className={`max-w-6xl mx-auto px-5 ${props.className || ""}`}>{props.children}</div>
}

export default Container
