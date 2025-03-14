import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

export default function PaymentModal({ movie, onComplete, setIsPaying }) {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const paymentMethod = watch("paymentMethod");

  const validateCard = (data) => {
    if (data.paymentMethod === "tarjeta") {
      if (!/^\d{16}$/.test(data.cardNumber)) {
        setError("cardNumber", { message: "Número de tarjeta inválido" });
        return false;
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate)) {
        setError("expiryDate", { message: "Fecha inválida (MM/YY)" });
        return false;
      }
      if (!/^\d{3,4}$/.test(data.cvv)) {
        setError("cvv", { message: "CVV inválido" });
        return false;
      }
    }
    return true;
  };

  const onSubmit = (data) => {
    if (!data.paymentMethod) {
      setError("paymentMethod", { message: "Selecciona un método de pago" });
      return;
    }

    if (validateCard(data)) {
      setIsProcessing(true);
      setTimeout(() => {
        const isSuccess = Math.random() > 0.2; // 80% éxito, 20% error
        setPaymentSuccess(isSuccess);
        setIsProcessing(false);
        if (isSuccess) {
          setTimeout(() => {
            onComplete(data.paymentMethod);
            setIsPaying(false);
          }, 2000);
        }
      }, 3000);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#181818] p-6 rounded-lg w-96 shadow-lg relative"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <motion.button
          onClick={() => setIsPaying(false)}
          className="absolute top-3 right-3 text-gray-300 hover:text-white text-2xl focus:outline-none"
          whileHover={{ scale: 1.2, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          ×
        </motion.button>

        <h2 className="text-xl font-bold text-white mb-4">
          Renta de {movie?.title}
        </h2>
        <p className="text-gray-400 mb-4">Precio: {movie?.price}</p>

        {isProcessing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white"
          >
            <p>Procesando pago...</p>
            <motion.div
              className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full mx-auto mt-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        ) : paymentSuccess !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white"
          >
            {paymentSuccess ? (
              <p className="text-green-400 text-lg">Pago exitoso</p>
            ) : (
              <p className="text-red-400 text-lg">Pago fallido ❌</p>
            )}
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-white mb-2">
              Selecciona un método de pago:
            </label>
            <select
              className="w-full p-2 bg-[#222] text-white rounded-md"
              {...register("paymentMethod")}
            >
              <option value="">Selecciona...</option>
              <option value="tarjeta">Tarjeta de crédito/débito</option>
              <option value="paypal">PayPal</option>
              <option value="crypto">Criptomonedas</option>
            </select>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm mt-1">
                {errors.paymentMethod.message}
              </p>
            )}

            {paymentMethod === "tarjeta" && (
              <motion.div
                className="mt-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <label className="block text-white mb-1">
                  Número de tarjeta:
                </label>
                <input
                  type="text"
                  className="w-full p-2 bg-[#222] text-white rounded-md"
                  placeholder="1234 5678 9101 1121"
                  maxLength="16"
                  {...register("cardNumber")}
                />
                <div className="flex gap-2 mt-2">
                  <div className="w-1/2">
                    <label className="block text-white mb-1">Expiración:</label>
                    <input
                      type="text"
                      className="w-full p-2 bg-[#222] text-white rounded-md"
                      placeholder="MM/YY"
                      maxLength="5"
                      {...register("expiryDate")}
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-white mb-1">CVV:</label>
                    <input
                      type="text"
                      className="w-full p-2 bg-[#222] text-white rounded-md"
                      placeholder="123"
                      maxLength="4"
                      {...register("cvv")}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <button
              type="submit"
              className="mt-4 w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
            >
              Confirmar pago
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
