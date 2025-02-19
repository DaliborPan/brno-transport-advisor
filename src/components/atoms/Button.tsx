type ButtonProps = {
  label: string
  extraClasses?: string
  onClick: () => any
}

export const Button: React.FC<ButtonProps> = ({ onClick, label, extraClasses }) => {
  return (
    <button className={`btn ${extraClasses}`} onClick={onClick}>
      {label}
    </button>
  )
}
