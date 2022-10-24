import React from 'react'

const loader = (type: string) =>
  React.lazy(() => import(`./components/${type.charAt(0).toUpperCase() + type.slice(1)}`))

export type GenericIconProps = React.ComponentPropsWithoutRef<'svg'>

type IconProps = {
  type: 'plus' | 'pencil' | 'trash' | 'ellipsis' | 'move'
} & GenericIconProps

function Icon(props: IconProps) {
  const { type } = props

  const [Component, setComponent] = React.useState<React.LazyExoticComponent<React.ComponentType<unknown>> | null>()

  React.useEffect(() => {
    setComponent(loader(type))
  }, [type])

  return <React.Suspense fallback={<></>}>{Component && <Component id={props.type} {...props} />}</React.Suspense>
}

export default Icon
