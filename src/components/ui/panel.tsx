import * as React from "react"
import { cn } from "@/lib/utils"

const Panel = React.forwardRef(function Panel(props: any, ref: any) {
  const { className, children, ...rest } = props
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 h-full overflow-hidden flex flex-col backdrop-blur-sm",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
})
Panel.displayName = "Panel"

const PanelHeader = React.forwardRef(function PanelHeader(props: any, ref: any) {
  const { className, ...rest } = props
  return (
    <div
      ref={ref}
      className={cn("border-b border-slate-200 dark:border-slate-700 px-6 py-4 bg-slate-50 dark:bg-slate-800/50", className)}
      {...rest}
    />
  )
})
PanelHeader.displayName = "PanelHeader"

const PanelTitle = React.forwardRef(function PanelTitle(props: any, ref: any) {
  const { className, ...rest } = props
  return (
    <h3
      ref={ref}
      className={cn("text-lg font-semibold text-slate-900 dark:text-slate-100", className)}
      {...rest}
    />
  )
})
PanelTitle.displayName = "PanelTitle"

const PanelContent = React.forwardRef(function PanelContent(props: any, ref: any) {
  const { className, ...rest } = props
  return <div ref={ref} className={cn("p-6 overflow-auto flex-1", className)} {...rest} />
})
PanelContent.displayName = "PanelContent"

export { Panel, PanelHeader, PanelTitle, PanelContent }
