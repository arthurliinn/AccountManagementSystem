<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const email = computed(() => (typeof route.query.email === 'string' ? route.query.email : ''))
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 md:p-10">
      <h1 class="text-gray-900 mb-2">帳號管理系統</h1>
      <p class="text-gray-600">歡迎，{{ email }}</p>
    </div>
  </div>
</template>
