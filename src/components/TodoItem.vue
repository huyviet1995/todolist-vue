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
      <input type="text" class="form-control" v-model="todoLabel" />
      <span class="btn-reset text-secondary" @click="handleReset">Reset</span>
    </form>
    <div class="buttons-container">
      <template v-if="!editMode">
        <img
          @click="handleEdit"
          src="./icons/edit-button.svg"
          alt="button-edit"
        />
      </template>
      <template v-else>
        <img
          @click="handleSave()"
          src="./icons/save-button.svg"
          alt="save-button"
        />
      </template>
      <img
        @click="deleteTodo"
        src="./icons/cancel-button.svg"
        alt="cancel-button"
      />
    </div>
  </li>
</template>
<script>
export default {
  data() {
    return {
      editMode: false,
      todoLabel: "",
    };
  },
  props: ["label", "isCompleted", "id"],
  methods: {
    handleSave() {
      const isEdited = this.todoLabel !== this.label;
      if (isEdited) {
        this.$store.dispatch("todos/editTodo", {
          id: this.id,
          label: this.todoLabel,
        });
      }
      this.editMode = false;
      if (this.todoLabel.trim() === "") {
        this.deleteTodo();
      }
    },
    handleReset() {
      this.todoLabel = this.label;
    },
    deleteTodo() {
      const confirmDelete = confirm(
        `Do you want to delete this item ${this.todoLabel}`
      );
      if (confirmDelete) {
        this.$store.dispatch("todos/deleteTodo", this.id);
      }
    },
    onCheck() {
      this.$store.dispatch("todos/toggleMarkAsCompleted", this.id);
    },
    handleEdit() {
      this.editMode = true;
      this.todoLabel = this.label;
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
  height: 32px;
  padding-left: 5px;
  margin-bottom: 5px;
}

.completed {
  text-decoration: line-through;
  color: red;
}

form {
  position: relative;
  margin-right: 10px;
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
  align-items: center;
}
img {
  opacity: 0.3;
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-bottom: 3px;
}
</style>
