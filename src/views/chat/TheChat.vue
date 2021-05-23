<template>
  <a class="open-icon" @click="toggleChat"
    ><img src="../../assets/images/chat.png" alt="chat-icon"
  /></a>

  <section class="msger" v-if="isChatShown">
    <header class="msger-header">
      <div class="msger-header-title">Chat</div>
      <div class="msger-header-minimize">
        <button class="msger-header-hide-chat" @click="toggleChat">—</button>
      </div>
    </header>

    <main class="msger-chat">
      <div
        class="msg left-msg"
        v-for="message in messages"
        :key="message?.id"
        :class="[
          message?.author?.full_name === userFullName
            ? 'left-msg'
            : 'right-msg',
        ]"
      >
        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">{{ message?.author?.full_name }}</div>
            <div class="msg-info-time">
              {{ message?.time }}
            </div>
          </div>

          <div class="msg-text">
            {{ message?.content }}
          </div>
        </div>
      </div>
    </main>

    <form class="msger-inputarea" @submit.prevent="sendMessage">
      <input
        type="text"
        class="msger-input"
        placeholder="Enter your message..."
        v-model.trim="writtenMessage"
        name="message"
      />
      <a type="submit" class="msger-send-btn">
        <i
          class="fa fa-paper-plane-o"
          aria-hidden="true"
          @click="sendMessage"
        ></i>
      </a>
    </form>
  </section>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const writtenMessage = ref("");
    const userFullName = computed(() => {
      return store.getters["chat/userFullName"];
    });
    const messages = computed(() => {
      return store.getters["chat/allMessages"];
    });
    const isChatShown = computed(() => {
      return store.getters["chat/isChatShown"];
    });

    async function onChatStarted() {
      await store.dispatch("chat/establishSocketConnection");
      store.dispatch("chat/requestUserFullName");
      await store.dispatch("chat/getUserFullName");
      store.dispatch("chat/requestAllMessages");
      await store.dispatch("chat/getAllMessages");
      store.dispatch("chat/receiveMessage");
    }

    onChatStarted();

    function toggleChat() {
      store.commit("chat/toggleChat");
    }

    function sendMessage() {
      if (writtenMessage.value && this.writtenMessage.length <= 29) {
        store.dispatch("chat/sendMessage", writtenMessage.value);
      }
      writtenMessage.value = "";
    }

    return {
      isChatShown,
      toggleChat,
      writtenMessage,
      sendMessage,
      messages,
      userFullName,
    };
  },
};
</script>
<style lang="scss" scoped>
.open-icon {
  cursor: pointer;
  position: fixed;
  bottom: 23px;
  left: 28px;
}

.msger {
  position: fixed;
  bottom: 0px;
  left: 0px;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  width: 320px;
  height: calc(50%);
  border-radius: 5px;
  box-shadow: 0 15px 15px -5px rgba(0, 0, 0, 0.2);

  &-header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background: #182533;
    color: white;

    &-hide-chat {
      background-color: transparent;
      color: white;
      cursor: pointer;
      border: none;
    }
  }

  &-chat {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
  }
}

.msg {
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;

  &:last-of-type {
    margin: 0;
  }

  &-bubble {
    max-width: 450px;
    padding: 15px;
    border-radius: 15px;
    background: #2b5278;
    color: white;
  }

  &-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  &-info-name {
    margin-right: 10px;
    font-weight: bold;
  }

  &-info-time {
    font-size: 0.85em;
  }
}

.left-msg .msg-bubble {
  border-bottom-left-radius: 0;
}

.right-msg {
  flex-direction: row-reverse;
}
.right-msg .msg-bubble {
  background: #182533;
  color: white;
  border-bottom-right-radius: 0;
}
.right-msg .msg-img {
  margin: 0 0 0 10px;
}

.msger-inputarea {
  display: flex;
  padding: 10px;
  background: #182533;
}

.msger-input {
  flex: 1;
  border: none;
  border-radius: 3px;
  font-size: 1em;
  padding: 8px;
}
.msger-send-btn {
  display: flex;
  align-items: center;
  margin-left: 10px;
  color: white;
  cursor: pointer;
  transition: background 0.23s;
  font-size: 1.5em;

  &:hover {
    color: #aba77d;
  }
}

.msger-chat {
  background-color: #fcfcfe;
}
</style>
