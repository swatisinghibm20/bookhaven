import { Link } from "react-router-dom";

/**
 * Shared checkout step-progress bar used across pages 2–4 of checkout.
 * steps: array of { label, to? } — completed steps with a `to` are clickable
 * currentStep: 0-based index of the active step
 */
export default function CheckoutSteps({ steps, currentStep }) {
  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="max-w-3xl mx-auto px-4 flex items-center justify-center gap-0">
        {steps.map((step, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          const Wrapper = done && step.to ? Link : "div";
          return (
            <div key={step.label} className="flex items-center">
              {/* Circle */}
              <Wrapper
                {...(Wrapper === Link ? { to: step.to } : {})}
                className={`flex flex-col items-center gap-1 ${Wrapper === Link ? "hover:opacity-75" : ""}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                    done
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : active
                      ? "bg-[#1e3a5f] border-[#1e3a5f] text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {done ? "✓" : i + 1}
                </div>
                <span
                  className={`text-xs whitespace-nowrap ${
                    done ? "text-emerald-600 font-semibold" : active ? "text-[#1e3a5f] font-bold" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </Wrapper>
              {/* Connector */}
              {i < steps.length - 1 && (
                <div
                  className={`h-0.5 w-12 sm:w-16 mx-1 mb-4 ${done ? "bg-emerald-500" : "bg-gray-200"}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
