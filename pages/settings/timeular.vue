<template>
  <div class="p-8">
    <div>
      <h1>Set your Timeular settings</h1>
      <h3>
        You can set your Timeular Api Keys
        <a href="https://app.timeular.com/#/settings/account" target="_blank"
          >here.</a
        >
      </h3>
      <div class="w-full md:w-96 my-4">
        <div class="flex flex-col my-2">
          <label for="apiKey" class="text-sm text-tertiary">Api Key</label>
          <input
            id="apiKey"
            v-model="apiKey"
            type="text"
            placeholder="xxxxxxx"
            class="rounded-full focus:ring-brand-primary focus:border-brand-primary"
          />
        </div>
        <div class="flex flex-col my-2">
          <label for="apiSecret" class="text-sm text-tertiary"
            >Api Secret</label
          >
          <input
            id="apiSecret"
            v-model="apiSecret"
            type="text"
            placeholder="xxxxxxx"
            class="rounded-full focus:ring-brand-primary focus:border-brand-primary"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Action, Component, Getter, Vue } from 'nuxt-property-decorator';

@Component({
  layout: 'dashboard',
})
export default class SettingsPage extends Vue {
  @Getter('user/timeular') timeular!: {
    apiKey: string;
    apiSecret: string;
  } | null;

  @Action('user/updateTimeularSettings') updateTimeularSettings!: (timeular: {
    apiKey: string;
    apiSecret: string;
  }) => void;

  get apiKey() {
    return this.timeular?.apiKey ?? '';
  }

  get apiSecret() {
    return this.timeular?.apiSecret ?? '';
  }

  set apiKey(apiKey: string) {
    this.updateTimeularSettings({ apiKey, apiSecret: this.apiSecret });
  }

  set apiSecret(apiSecret: string) {
    this.updateTimeularSettings({ apiSecret, apiKey: this.apiKey });
  }
}
</script>

<style scoped></style>
