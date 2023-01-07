<template>
  <li :class="{ completed: isCompleted }">
    <input
      type="checkbox"
      class="mr-2"
      :checked="isCompleted"
      @click="onCheck"
    />
    {{ label }}
    <div class="buttons-container">
      <span v-if="!editMode">
        <img
          @click="handleEdit"
          class="button-edit"
          src="./icons/edit-button.svg"
          alt=""
        />
      </span>
      <span class="icon-remove" @click="deleteTodo">X</span>
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
}
input[type="checkbox"] {
  transform: scale(1.3);
}
.completed {
  text-decoration: line-through;
  color: red;
}

.buttons-container {
  position: absolute;
  bottom: 3px;
  display: flex;
  gap: 10px;
  right: 10px;
}
.icon-remove {
  opacity: 0.5;
  cursor: pointer;
}

.button-edit {
  width: 20px;
  height: 20px;
  opacity: 0.3;
}
</style>
