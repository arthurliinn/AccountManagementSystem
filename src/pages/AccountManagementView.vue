<script setup lang="ts">

import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { onMounted } from 'vue'


const route = useRoute()
const router = useRouter()
const email = computed(() => (typeof route.query.email === 'string' ? route.query.email : ''))

function handleLogout() {
  router.push({ name: 'login' })
};

let accounts = ref([
  {
    name: '張小明',
    email: 'ming.chang@example.com',
    role: '管理員',
    status: '啟用',
    createdAt: '2024-01-15',
  },
  {
    name: '李美麗',
    email: 'mei.li@example.com',
    role: '使用者',
    status: '啟用',
    createdAt: '2024-01-16',
  },
  {
    name: '王大寶',
    email: 'dabao.wang@example.com',
    role: '使用者',
    status: '停用',
    createdAt: '2024-03-10',
  },
])

const searchQuery = ref('')

function handleSearchInput(event: Event) {
  searchQuery.value = (event.target as HTMLInputElement).value
}

function handleDeleteAccount(email: string) {
  accounts.value = accounts.value.filter((account) => account.email !== email)
}

const isAddModalOpen = ref(false)

const newAccount = ref({
  name: '',
  email: '',
  role: '管理員',
  status: '啟用',
})

function openAddModal() {
  isAddModalOpen.value = true
}

function closeAddModal() {
  isAddModalOpen.value = false
  newAccount.value = { name: '', email: '', role: '管理員', status: '啟用' }
}

function handleAddAccount() {
  if (!newAccount.value.name || !newAccount.value.email) return
  accounts.value.push({
    name: newAccount.value.name,
    email: newAccount.value.email,
    role: newAccount.value.role,
    status: newAccount.value.status,
    createdAt: new Date().toISOString().slice(0, 10),
  })
  closeAddModal()
}

const filteredAccounts = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()
  if (!keyword) return accounts.value
  return accounts.value.filter((account) =>
    [account.name, account.email, account.role, account.status].some((field) =>
      field.toLowerCase().includes(keyword)
    )
  )
})

</script>

<template>
  <div class="mainContainer">
    <div class="tailwind css-myl2ny css-10v5rb">
      <div class="min-h-screen bg-gray-50">
        <header class="bg-white shadow-sm border-b border-gray-200">
          <div
            class="max-w-7xl !mx-auto max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
          >
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center"
                >
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
                    class="lucide lucide-users w-6 h-6 text-white"
                    aria-hidden="true"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div>
                  <h1 class="text-gray-900">帳號管理系統</h1>
                  <p class="text-gray-600">管理您的所有帳號</p>
                </div>
              </div>
              <button
                v-on:click="handleLogout"
                class="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
              >
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
                  class="lucide lucide-log-out w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="m16 17 5-5-5-5"></path>
                  <path d="M21 12H9"></path>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                </svg>
                <span>登出</span>
              </button>
            </div>
          </div>
        </header>
        <main class="max-w-7xl !mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="mb-6 flex flex-col sm:flex-row gap-4 input-area">
            <div class="flex-1 relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
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
                  class="lucide lucide-search h-5 w-5 text-gray-400"
                  aria-hidden="true"
                >
                  <path d="m21 21-4.34-4.34"></path>
                  <circle cx="11" cy="11" r="8"></circle>
                </svg>
              </div>
              <input
                :value="searchQuery"
                v-on:input="handleSearchInput"
                type="text"
                placeholder="搜尋帳號（姓名、郵件、角色）..."
                class="text-black block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition search-input"
              />
            </div>
            <button
              v-on:click="openAddModal"
              class="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition duration-200 whitespace-nowrap"
            >
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
                class="lucide lucide-plus w-5 h-5"
                aria-hidden="true"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path></svg
              >新增帳號
            </button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 account-total">
            <div
              class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <p class="text-gray-600 mb-1">總帳號數</p>
              <p class="text-gray-900">3</p>
            </div>
            <div
              class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <p class="text-gray-600 mb-1">啟用中</p>
              <p class="text-gray-900">2</p>
            </div>
            <div
              class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <p class="text-gray-600 mb-1">已停用</p>
              <p class="text-gray-900">1</p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="account in filteredAccounts"
              :key="account.email"
              class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow account-card"
            >
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white"
                  >
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
                      class="lucide lucide-user w-6 h-6"
                      aria-hidden="true"
                    >
                      <path
                        d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
                      ></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-gray-900">{{ account.name }}</h3>
                    <span
                      class="inline-block px-2 py-1 rounded-full text-white mt-1"
                      :class="account.status === '啟用' ? 'bg-green-500' : 'bg-gray-400'"
                      >{{ account.status }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="space-y-3 mb-4">
                <div class="flex items-center gap-2 text-gray-600">
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
                    class="lucide lucide-mail w-4 h-4"
                    aria-hidden="true"
                  >
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect></svg
                  ><span class="break-all">{{ account.email }}</span>
                </div>
                <div class="flex items-center gap-2 text-gray-600">
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
                    class="lucide lucide-user w-4 h-4"
                    aria-hidden="true"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle></svg
                  ><span>{{ account.role }}</span>
                </div>
                <div class="flex items-center gap-2 text-gray-600">
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
                    class="lucide lucide-calendar w-4 h-4"
                    aria-hidden="true"
                  >
                    <path d="M8 2v4"></path>
                    <path d="M16 2v4"></path>
                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                    <path d="M3 10h18"></path></svg
                  ><span>{{ account.createdAt }}</span>
                </div>
              </div>
              <div class="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition"
                >
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
                    class="lucide lucide-square-pen w-4 h-4"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                    ></path>
                    <path
                      d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
                    ></path></svg
                  >編輯</button
                ><button
                  v-on:click="handleDeleteAccount(account.email)"
                  class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition"
                >
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
                    class="lucide lucide-trash2 lucide-trash-2 w-4 h-4"
                    aria-hidden="true"
                  >
                    <path d="M10 11v6"></path>
                    <path d="M14 11v6"></path>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                    <path d="M3 6h18"></path>
                    <path
                      d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                    ></path></svg
                  >刪除
                </button>
              </div>
            </div>
          </div>
          <div
            v-if="isAddModalOpen"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                <h2 class="text-gray-900">新增帳號</h2>
                <button
                  type="button"
                  v-on:click="closeAddModal"
                  class="p-2 hover:bg-gray-100 rounded-lg transition"
                >
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
                    class="lucide lucide-x w-5 h-5 text-gray-500"
                    aria-hidden="true"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
              <form v-on:submit.prevent="handleAddAccount" class="p-6">
                <div class="space-y-5">
                  <div>
                    <label for="name" class="block text-gray-700 mb-2"
                      >姓名 <span class="text-red-500">*</span></label
                    >
                    <input
                      id="name"
                      name="name"
                      v-model="newAccount.name"
                      type="text"
                      class="text-black block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="請輸入姓名"
                      required
                    />
                  </div>
                  <div>
                    <label for="email" class="block text-gray-700 mb-2"
                      >電子郵件 <span class="text-red-500">*</span></label
                    >
                    <input
                      id="email"
                      name="email"
                      v-model="newAccount.email"
                      type="email"
                      class="text-black block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label for="role" class="block text-gray-700 mb-2"
                      >角色 <span class="text-red-500">*</span></label
                    >
                    <select
                      id="role"
                      name="role"
                      v-model="newAccount.role"
                      class="text-black block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      required
                    >
                      <option value="管理員">管理員</option>
                      <option value="編輯">編輯</option>
                      <option value="用戶">用戶</option>
                      <option value="訪客">訪客</option>
                    </select>
                  </div>
                  <div>
                    <label for="status" class="block text-gray-700 mb-2"
                      >狀態 <span class="text-red-500">*</span></label
                    >
                    <select
                      id="status"
                      name="status"
                      v-model="newAccount.status"
                      class="text-black block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      required
                    >
                      <option value="啟用">啟用</option>
                      <option value="停用">停用</option>
                    </select>
                  </div>
                </div>
                <div class="flex gap-3 mt-8">
                  <button
                    type="button"
                    v-on:click="closeAddModal"
                    class="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    class="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                  >
                    新增帳號
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: var(--text-2xl);
  font-weight: 500;
  line-height: 1.5;
}
.search-input {
  transition: box-shadow 0.2s ease-in-out;
}
.search-input::placeholder {
  color: oklab(0.145 0 0 / 0.5);
}

.input-area{
  margin-bottom: 24px;
}
.account-total{
  margin-bottom: 32px;
}
</style>
