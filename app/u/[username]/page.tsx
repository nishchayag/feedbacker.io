"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";

type FormData = {
  message: string;
};

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([]);
  const [username, setUsername] = useState("");
  const [refreshVar, setRefreshVar] = useState(1);
  const params = useParams();
  const [generatingSuggestions, setGeneratingSuggestions] = useState(false);

  const { register, handleSubmit, setValue, reset } = useForm<FormData>({
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    setUsername(params.username as string);
  }, [params]);

  const handleRefresh = () => {
    setRefreshVar((prev) => prev * -1);
  };

  const handleSubmitFunction = async (data: FormData) => {
    setLoading(true);
    try {
      const acceptingResponse = await axios.get(
        `/api/isAcceptingMessagesForSender/${username}`
      );

      if (!acceptingResponse.data.isAcceptingMessages) {
        toast.error("User is not accepting messages.");
        setLoading(false);
        return;
      }

      const response = await axios.post("/api/sendMessage", {
        username,
        content: data.message,
      });

      if (!response.data.success) {
        toast.error(response.data.error || "Failed to send message");
        setLoading(false);
        return;
      }

      toast.success("Message sent successfully");
      reset(); // ✅ clears the textarea
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await axios.post("/api/suggestMessages");

        const parts = res.data.completion
          .split("||")
          .map((s: string) => s.trim())
          .filter(Boolean);

        setSuggestedMessages(parts);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    };

    fetchSuggestions();
  }, [refreshVar]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-muted">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8 border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Submit Anonymous Feedback
        </h1>

        <form
          className="space-y-6"
          onSubmit={handleSubmit(handleSubmitFunction)}
        >
          <div className="relative">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Send Feedback message to @{username}
            </label>
            <textarea
              id="message"
              {...register("message")}
              placeholder="Type your feedback here..."
              rows={3}
              className="w-full resize-none overflow-hidden rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all"
              onInput={(e) => {
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height =
                  e.currentTarget.scrollHeight + "px";
              }}
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 px-5 rounded-lg shadow transition"
            >
              Submit Feedback
            </button>
          </div>
        </form>

        {/* Suggestion Box */}
        <div className="w-full max-w-2xl mt-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex justify-between">
            Not sure what to write? Try one of these:{" "}
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 transition"
            >
              <RefreshCw
                className={`h-4 w-4 ${generatingSuggestions ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </h2>

          <div className="grid gap-3">
            {suggestedMessages.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setValue("message", suggestion);
                  const textarea = document.getElementById(
                    "message"
                  ) as HTMLTextAreaElement;
                  if (textarea) {
                    textarea.style.height = "auto";
                    textarea.style.height = textarea.scrollHeight + "px";
                  }
                }}
                className="text-left w-full bg-white hover:bg-indigo-50 transition border border-gray-300 rounded-lg px-4 py-3 text-sm shadow cursor-pointer"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
