<script setup lang="ts">
import { ref } from 'vue'

const tags = ref<string[]>([])
const inputValue = ref('')

function addTag() {
  const trimmed = inputValue.value.trim()
  if (trimmed === '') return
  if (tags.value.includes(trimmed)) return
  
  tags.value.push(trimmed)
  inputValue.value = ''
}

function removeTag(index: number) {
  tags.value.splice(index, 1)
}
</script>

<template>
  <div class="tag-input">
    <ul role="list" class="tag-list">
      <li
        v-for="(tag, index) in tags"
        :key="tag + '-' + index"
        role="listitem"
        class="tag-item"
      >
        <span class="tag-text">{{ tag }}</span>
        <button
          type="button"
          :aria-label="`Remove tag ${tag}`"
          class="tag-remove"
          @click="removeTag(index)"
        >
          ×
        </button>
      </li>
    </ul>
    <input
      v-model="inputValue"
      type="text"
      placeholder="Type a tag and press Enter"
      aria-label="Add a tag"
      @keydown.enter.prevent="addTag"
    />
  </div>
</template>

<style scoped>
.tag-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 400px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #e0e7ff;
  border-radius: 16px;
  padding: 4px 12px;
  font-size: 14px;
}

.tag-text {
  color: #3730a3;
}

.tag-remove {
  background: none;
  border: none;
  cursor: pointer;
  color: #6366f1;
  font-size: 16px;
  line-height: 1;
  padding: 0 2px;
}

.tag-remove:hover {
  color: #ef4444;
}

input {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}

input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}
</style>




