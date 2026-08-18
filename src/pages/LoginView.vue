<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  email: '',
  password: '',
  rememberMe: false,
})

const emailError = ref('')
const passwordError = ref('')

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 6

function handleSubmit() {
  emailError.value = EMAIL_REGEX.test(form.email) ? '' : '請輸入正確的電子郵件格式'
  passwordError.value =
    form.password.length >= MIN_PASSWORD_LENGTH ? '' : `密碼長度至少需 ${MIN_PASSWORD_LENGTH} 碼`

  if (emailError.value || passwordError.value) {
    return
  }

  router.push({ name: 'account-management', query: { email: form.email } })
}
</script>

<template>
  <div id="container">
    <div class="tailwind css-myl2ny css-10v5rb">
      <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div class="w-full max-w-md">
          <form
            class="bg-white rounded-2xl shadow-xl p-8 md:p-10"
            @submit.prevent="handleSubmit"
          >
            <div class="text-center top-text-center mb-8">
              <div class="topLogo inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-in w-8 h-8 text-white" aria-hidden="true"><path d="m10 17 5-5-5-5"></path><path d="M15 12H3"></path><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path></svg></div>
              <h1 class="text-gray-900 mb-2">歡迎回來</h1>
              <p class="text-gray-600">請登入您的帳號以繼續</p>
            </div>
            <div class="input-box">
              <div class="mb-4 flex flex-col gap-1.5">
                <label for="email" class="block text-gray-700 mb-2">電子郵件</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-mail h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    >
                      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    </svg>
                  </div>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <p v-if="emailError" class="text-red-600 text-sm mt-1">{{ emailError }}</p>
              </div>
            </div>
            <div class="input-box">
              <div class="mb-4 flex flex-col gap-1.5">
                <label for="password" class="text-sm font-medium text-gray-700">密碼</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-lock h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    >
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <input
                    id="password"
                    v-model="form.password"
                    type="password"
                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <p v-if="passwordError" class="text-red-600 text-sm mt-1">{{ passwordError }}</p>
              </div>
            </div>

            <div class="flex items-center justify-between input-box">
              <label class="flex items-center">
                <input type="checkbox" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <span class="ml-2 text-gray-700">記住我</span>
              </label>
              <a href="#" class="text-indigo-600 hover:text-indigo-700">忘記密碼？</a>
            </div>

            <button
              type="submit"
              class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              登入
            </button>
            <div class="tip mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"><p class="text-blue-800 text-center">💡提示：輸入任意電子郵件和密碼即可登入</p></div>
          </form>
          <p class="text-center mt-6 text-gray-600">還沒有帳號？ <a href="#" class="text-indigo-600 hover:text-indigo-700">立即註冊</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top-text-center{
  margin-bottom: 32px;
}
.topLogo {
  margin-bottom: 8px;
}
.input-box {
  margin-bottom: 24px;
}

input {
  color:oklch(0.145 0 0);
}


.tip {
  margin-top: 24px;
}
</style>
