import React from "react";
import ChatBot from "react-simple-chatbot";

export default function ChatbotContainer() {
  return (
    <ChatBot
      floating
      floatingStyle={{ position: "fixed", bottom: "5%" }}
      headerTitle="Welcome to BioQuiz!"
      recognitionEnable={true}
      steps={[
        {
          id: "1",
          message: "What is your name?",
          trigger: "2",
        },
        {
          id: "2",
          user: true,
          trigger: "3",
        },
        {
          id: "3",
          message:
            "Hi {previousValue}! If you have any questions don't forget to message the admins. Enjoy the game.",
          end: true,
        },
      ]}
    />
  );
}
