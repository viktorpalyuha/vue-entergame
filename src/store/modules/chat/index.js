import * as io from "socket.io-client";

export default {
  namespaced: true,
  state() {
    return {
      socket: null,
      shouldShowChat: false,
      messages: [],
      userFullName: null,
    };
  },
  mutations: {
    toggleChat(state) {
      state.shouldShowChat = !state.shouldShowChat;
    },
    establishConnection(state, payload) {
      state.socket = payload;
    },
    requestAllMessages(state) {
      state.socket.emit("requestAllMessages");
    },
    setAllMessages(state, payload) {
      state.messages = payload;
    },
    sendMessage(state, payload) {
      state.socket.emit("sendMessage", payload);
    },
    requestUserFullName(state) {
      state.socket.emit("requestUserFullName");
    },
    setUserFullName(state, payload) {
      state.userFullName = payload;
    },
    setReceivedMessage(state, payload) {
      state.messages.push(payload);
    },
  },
  actions: {
    async establishSocketConnection(context) {
      const connection = io("http://localhost:3000", {
        transports: ["websocket"],
        query: {
          authorization: await context.dispatch("getToken", "dummyValue", {
            root: true,
          }),
        },
      });

      context.commit("establishConnection", connection);
    },
    requestAllMessages(context) {
      context.commit("requestAllMessages");
    },
    async getAllMessages(context) {
      context.state.socket.on("sendAllMessages", (messages) => {
        context.commit("setAllMessages", messages);
      });
    },
    sendMessage(context, payload) {
      context.commit("sendMessage", payload);
    },
    requestUserFullName(context) {
      context.commit("requestUserFullName");
    },
    async getUserFullName(context) {
      context.state.socket.on("sendUserFullName", (fullName) => {
        context.commit("setUserFullName", fullName);
      });
    },
    receiveMessage(context) {
      context.state.socket.on("receivedMessage", (message) => {
        context.commit("setReceivedMessage", message);
      });
    },
  },
  getters: {
    isChatShown(state) {
      return state.shouldShowChat;
    },
    allMessages(state) {
      return state.messages;
    },
    userFullName(state) {
      return state.userFullName;
    },
  },
};
