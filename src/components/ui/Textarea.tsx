import React, { TextareaHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={twMerge(
                        "w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[100px]",
                        error &&
                            "border-red-500 focus:ring-red-500 focus:border-red-500",
                        className
                    )}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";
export default Textarea;
