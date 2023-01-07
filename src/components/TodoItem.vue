<template>
  <li :class="{ completed: isCompleted }">
    <input
      type="checkbox"
      class="mr-2"
      :checked="isCompleted"
      @click="onCheck"
    />
    <span v-if="!editMode">
      {{ label }}
    </span>
    <form v-else>
      <input type="text" class="form-control" :value="label" />
      <span class="btn-reset text-secondary">Reset</span>
    </form>
    <div class="buttons-container">
      <template v-if="!editMode">
        <img
          @click="handleEdit"
          src="./icons/edit-button.svg"
          alt="button-edit"
        />
        <img
          @click="deleteTodo"
          src="./icons/cancel-button.svg"
          alt="cancel-button"
        />
      </template>
      <template v-else>
        <img src="./icons/save-button.svg" alt="save-button" />
        <img src="./icons/cancel-button.svg" alt="cancel-button" />
      </template>
    </div>
  </li>
</template>
<script>
export default {
  data() {
    return {
      editMode: false,
    };
  },
  props: ["label", "isCompleted", "id"],
  methods: {
    deleteTodo() {
      this.$store.dispatch("deleteTodo", this.id);
    },
    onCheck() {
      this.$store.dispatch("toggleMarkAsCompleted", this.id);
    },
    handleEdit() {
      this.editMode = true;
    },
  },
};
</script>

<style scoped>
li {
  text-decoration: none;
  list-style-type: none;
  border-bottom: 1px solid black;
  color: green;
  position: relative;
  display: flex;
}
input[type="checkbox"] {
  transform: scale(1.3);
}

input[type="text"] {
  height: 24px;
  padding-left: 5px;
  margin-bottom: 5px;
}

.completed {
  text-decoration: line-through;
  color: red;
}

form {
  width: 75%;
  position: relative;
}

.btn-reset {
  position: absolute;
  display: flex;
  align-items: center;
  margin-right: auto;
  right: 2px;
  bottom: 3px;
  height: 90%;
  width: fit-content;
  font-size: 12px;
  opacity: 0.6;
  line-height: 100%;
  text-transform: uppercase;
  margin-right: 5px;
  padding-left: 5px;
  padding-right: 5px;
  cursor: pointer;
}

.buttons-container {
  display: flex;
  gap: 10px;
  margin-left: auto;
}
img {
  opacity: 0.3;
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-bottom: 3px;
}
</style>
