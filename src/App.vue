<script setup lang="ts">
import LoginView from './components/LoginView.vue'

function handleLogin(payload: { email: string; password: string; rememberMe: boolean }) {
  console.log('login submit', payload)
}
</script>

<template>
  <LoginView @submit="handleLogin" />
</template>
