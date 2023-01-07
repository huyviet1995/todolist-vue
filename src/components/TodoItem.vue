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
    <span v-else>
      <input type="text" class="form-control" :value="label" />
    </span>
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
  display: flex;
}
input[type="checkbox"] {
  transform: scale(1.3);
}

input[type="text"] {
  width: 60%;
  height: 24px;
}

.completed {
  text-decoration: line-through;
  color: red;
}

.buttons-container {
  display: flex;
  gap: 10px;
  margin-left: auto;
}
.icon-remove {
  opacity: 0.5;
  cursor: pointer;
}

.button-edit {
  width: 20px;
  height: 20px;
  opacity: 0.3;
  margin-bottom: 3px;
}
</style>
