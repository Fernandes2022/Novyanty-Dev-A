"use client";
import { useState } from "react";
import { X, CreditCard, Check, Zap, Crown, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePayment } from "../hooks/usePayment";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 9.99,
    icon: Zap,
    features: [
      "Custom domain deployment",
      "Advanced export options",
      "5 projects per month",
      "Email support"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "pro",
    name: "Pro",
    price: 24.99,
    icon: Crown,
    features: [
      "Everything in Basic",
      "Unlimited projects",
      "Priority rendering",
      "Team collaboration (5 members)",
      "Priority support"
    ],
    color: "from-indigo-500 to-purple-500",
    popular: true
  },
  {
    id: "premium",
    name: "Premium",
    price: 49.99,
    icon: Rocket,
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "White-label options",
      "API access",
      "Dedicated account manager"
    ],
    color: "from-purple-500 to-pink-500"
  }
];

export function PaymentModal({ isOpen, onClose, onSuccess }: PaymentModalProps) {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { processPayment, isLoading } = usePayment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const plan = plans.find(p => p.id === selectedPlan);
    if (!plan) return;

    const result = await processPayment({
      amount: plan.price,
      userId: "demo_user_123",
      plan: selectedPlan as any
    });

    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => {
        onSuccess?.();
        onClose();
        setShowSuccess(false);
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-4xl w-full p-8 border-2 border-gray-200 dark:border-gray-800 max-h-[90vh] overflow-y-auto">
              {!showSuccess ? (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        🚀 Go Live & Unlock Premium
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Choose your plan and start creating without limits
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>

                  {/* Plan Selection */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {plans.map((plan) => {
                      const Icon = plan.icon;
                      return (
                        <button
                          key={plan.id}
                          onClick={() => setSelectedPlan(plan.id)}
                          className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
                            selectedPlan === plan.id
                              ? "border-indigo-500 dark:border-indigo-400 shadow-xl scale-105"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          {plan.popular && (
                            <div className="absolute -top-3 right-4 px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold rounded-full">
                              POPULAR
                            </div>
                          )}

                          <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${plan.color} mb-4`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>

                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {plan.name}
                          </h3>
                          <div className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                            ${plan.price}
                            <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">/month</span>
                          </div>

                          <ul className="space-y-2">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </button>
                      );
                    })}
                  </div>

                  {/* Payment Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Payment Details
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Card Number
                          </label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                            placeholder="4242 4242 4242 4242"
                            className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-colors"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                              placeholder="MM/YY"
                              maxLength={5}
                              className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-colors"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              CVV
                            </label>
                            <input
                              type="text"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                              placeholder="123"
                              maxLength={3}
                              className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-colors"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Processing...
                        </span>
                      ) : (
                        `Subscribe to ${plans.find(p => p.id === selectedPlan)?.name} - $${plans.find(p => p.id === selectedPlan)?.price}/mo`
                      )}
                    </button>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                      🔒 Secured by Stripe • Cancel anytime
                    </p>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                    <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    🎉 Payment Successful!
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    All premium features unlocked
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
