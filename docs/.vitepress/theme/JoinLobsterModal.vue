<script setup lang="ts">
/**
 * 龙虾破冰计划报名弹窗（独立组件，避免在 .md 中写大块 HTML 被 Markdown 当成代码块渲染）
 */
defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function close() {
  emit('update:modelValue', false)
}

/** 静态图放在 docs/public/academy/，构建后 URL 为 /academy/…（勿放 docs/academy/，生产构建可能打不进包） */
const paymentCodeSrc = '/academy/payment-code.jpg'
const assistantWechatSrc = '/academy/assistant-wechat.jpg'
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="join-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="join-modal-title"
      @click.self="close"
    >
      <div class="join-modal" @click.stop>
        <button type="button" class="join-modal__close" aria-label="关闭" @click="close">✕</button>

        <h2 id="join-modal-title" class="join-modal__title">OpenClaw 入门实战课</h2>
        <p class="join-modal__subtitle">5 天打造你的 AI 私人助理</p>

        <div class="join-modal__grid">
          <div class="join-modal__col">
            <div class="join-modal__qr-wrap">
              <img :src="paymentCodeSrc" alt="收款码" width="220" height="220" loading="lazy" />
            </div>
            <div class="join-modal__price">
              <strong>¥98</strong>
              <del>原价 ¥196</del>
            </div>
            <p class="join-modal__label">微信扫码付费</p>
          </div>

          <div class="join-modal__col">
            <div class="join-modal__qr-wrap">
              <img :src="assistantWechatSrc" alt="助理微信码" width="220" height="220" loading="lazy" />
            </div>
            <div class="join-modal__wechat-title">添加微信进群</div>
            <p class="join-modal__label">交流答疑 · 文档资料 · 权益通知</p>
          </div>
        </div>

        <div class="join-modal__notice" role="note">
          <span class="join-modal__notice-label">重要提示</span>
          <p class="join-modal__notice-text">
            扫码付费后，请<strong>添加群助理</strong>，将<strong>付费凭证截图</strong>发给群助理；群助理验证后会<strong>拉你入群</strong>。
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>
