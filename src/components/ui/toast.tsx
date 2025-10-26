"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef(function ToastViewport(props: any, ref: any) {
  const { className, ...rest } = props
  return (
    <ToastPrimitives.Viewport
      ref={ref}
      className={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className
      )}
      {...rest}
    />
  )
})
ToastViewport.displayName = "ToastViewport"

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef(function Toast(props: any, ref: any) {
  const { className, variant, ...rest } = props
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...rest}
    />
  )
})
Toast.displayName = "Toast"

const ToastAction = React.forwardRef(function ToastAction(props: any, ref: any) {
  const { className, ...rest } = props
  return (
    <ToastPrimitives.Action
      ref={ref}
      className={cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium",
        className
      )}
      {...rest}
    />
  )
})
ToastAction.displayName = "ToastAction"

const ToastClose = React.forwardRef(function ToastClose(props: any, ref: any) {
  const { className, ...rest } = props
  return (
    <ToastPrimitives.Close
      ref={ref}
      className={cn("absolute right-2 top-2 rounded-md p-1", className)}
      {...rest}
    >
      <X className="h-4 w-4" />
    </ToastPrimitives.Close>
  )
})
ToastClose.displayName = "ToastClose"

const ToastTitle = React.forwardRef(function ToastTitle(props: any, ref: any) {
  const { className, ...rest } = props
  return (
    <ToastPrimitives.Title
      ref={ref}
      className={cn("text-sm font-semibold", className)}
      {...rest}
    />
  )
})
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef(function ToastDescription(props: any, ref: any) {
  const { className, ...rest } = props
  return (
    <ToastPrimitives.Description
      ref={ref}
      className={cn("text-sm opacity-90", className)}
      {...rest}
    />
  )
})
ToastDescription.displayName = "ToastDescription"

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
