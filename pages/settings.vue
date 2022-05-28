<template>
  <div>
    <div class="sm:hidden">
      <label class="sr-only" for="tabs">Select a tab</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <select
        id="tabs"
        class="block w-full pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm rounded-md"
        name="tabs"
        @change="changeTab"
      >
        <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
          {{ tab.name }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="">
        <nav aria-label="Tabs" class="-mb-px flex space-x-8">
          <nuxt-link
            v-for="tab in tabs"
            :key="tab.name"
            :aria-current="tab.current ? 'page' : undefined"
            :class="[
              tab.current
                ? 'border-brand-primary-dark text-brand-primary-dark'
                : 'border-transparent text-tertiary hover:text-brand-primary hover:border-brand-primary',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg',
            ]"
            :to="tab.href"
          >
            {{ tab.name }}
          </nuxt-link>
        </nav>
      </div>
    </div>
    <div>
      <NuxtChild />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  layout: 'dashboard',
})
export default class SettingsPage extends Vue {
  get tabs() {
    const currentTab = this.$route.path.split('/').pop();

    return [
      {
        name: 'Timeular',
        href: 'timeular',
        current: currentTab === 'timeular',
      },
      {
        name: 'Project Mapping',
        href: 'activities',
        current: currentTab === 'activities',
      },
      { name: 'Runn', href: 'runn', current: currentTab === 'runn' },
    ];
  }

  changeTab(event: any) {
    const tab = this.tabs.find((tab) => tab.name === event.target.value);
    if (!tab) return;
    this.$router.push('/settings/' + tab.href);
  }
}
</script>

<style scoped></style>
