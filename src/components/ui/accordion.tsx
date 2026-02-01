"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const AccordionContext = React.createContext<{
    activeItem: string | undefined;
    setActiveItem: (value: string | undefined) => void;
}>({ activeItem: undefined, setActiveItem: () => { } });

const Accordion = ({
    children,
    type = "single",
    collapsible = false,
    className,
    ...props
}: {
    children: React.ReactNode;
    type?: "single" | "multiple";
    collapsible?: boolean;
    className?: string;
}) => {
    const [activeItem, setActiveItemState] = React.useState<string | undefined>(undefined);

    const setActiveItem = (value: string | undefined) => {
        if (collapsible && value === activeItem) {
            setActiveItemState(undefined);
        } else {
            setActiveItemState(value);
        }
    };

    return (
        <AccordionContext.Provider value={{ activeItem, setActiveItem }}>
            <div className={cn("space-y-1", className)} {...props}>
                {children}
            </div>
        </AccordionContext.Provider>
    );
};

const AccordionItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => (
    <div ref={ref} className={cn("border-b", className)} data-value={value} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
    const { activeItem, setActiveItem } = React.useContext(AccordionContext);
    // Find parent Item value. In a real Radix clone we'd use context for Item too, but we can traverse or just rely on manual value prop?
    // Let's rely on a simpler approach: AccordionTrigger must be inside AccordionItem.
    // Actually, to keep it simple and compatible with the API I used in FAQ page:
    // <AccordionItem value="item-1">...

    // We need to know "my" value. 
    // Let's modify AccordionItem to pass context.

    return (
        <AccordionItemContext.Consumer>
            {({ value }) => {
                const isOpen = activeItem === value;
                return (
                    <div className="flex">
                        <button
                            ref={ref}
                            onClick={() => setActiveItem(value)}
                            className={cn(
                                "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline",
                                className
                            )}
                            {...props}
                        >
                            {children}
                            <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")} />
                        </button>
                    </div>
                )
            }}
        </AccordionItemContext.Consumer>
    )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const { activeItem } = React.useContext(AccordionContext);

    return (
        <AccordionItemContext.Consumer>
            {({ value }) => {
                const isOpen = activeItem === value;
                if (!isOpen) return null;
                return (
                    <div
                        ref={ref}
                        className={cn("overflow-hidden text-sm animate-in slide-in-from-top-1", className)}
                        {...props}
                    >
                        <div className={cn("pb-4 pt-0", className)}>{children}</div>
                    </div>
                )
            }}
        </AccordionItemContext.Consumer>
    )
})
AccordionContent.displayName = "AccordionContent"

// Helper context for Item
const AccordionItemContext = React.createContext<{ value: string }>({ value: "" });

// Wrap Item to provide context
const AccordionItemWrapper = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, children, ...props }, ref) => (
    <AccordionItemContext.Provider value={{ value }}>
        <div ref={ref} className={cn("border-b", className)} {...props}>
            {children}
        </div>
    </AccordionItemContext.Provider>
))
AccordionItemWrapper.displayName = "AccordionItem"

export { Accordion, AccordionItemWrapper as AccordionItem, AccordionTrigger, AccordionContent }
