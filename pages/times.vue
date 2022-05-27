<template>
  <div class="p-8">
    <h1 class="mb-4">Select the timeline to import entries from Timeular to Runn</h1>
    <div class="flex flex-col justify-around">
      <div class="my-2">
        <label class="mr-4">Start date</label>
        <input class="rounded-full text-secondary" type="date" :value="start" @input="setStartDate" />
      </div>
      <div class="my-2">
        <label class="mr-4">End date</label>
        <input class="rounded-full text-secondary" type="date" :value="end" @input="setEndDate" />
      </div>
    </div>
    <div>
      <button
        class="rounded-full text-white bg-brand-primary py-2 px-4"
        @click="getEntriesBetweenDates"
      >
        Get Entries
      </button>
    </div>
    <div class="mt-8">
      <ul class="flex flex-wrap">
        <lazy-block-entry
          v-for="entry of timeEntries"
          :key="entry.id"
          :entry="entry"
        />
      </ul>
    </div>
  </div>
</template>

<script lang="ts">

import {Action, Component, Getter, Vue} from "nuxt-property-decorator";
import {Activity, Entry} from "~/functions/src/timeular/timeular.models";
import {Project} from "~/functions/src/runn/runn.models";

@Component({
  layout: 'dashboard'
})
export default class times extends Vue {
  @Getter("startDate") startDate!: Date;
  @Getter("endDate") endDate!: Date;
  @Getter("timeular/entries") entries!: Entry[];
  @Getter('timeular/activitiesMap') activitiesMap!: Record<string, Activity>;
  @Getter('runn/projectsMap') projectsMap!: Record<string, Project>;
  @Getter('user/projectsMapping') projectsMapping!: Record<string, string>;
  @Action('timeular/loadActivities') loadActivities!: () => Promise<void>;
  @Action('runn/loadProjects') loadProjects!: () => Promise<void>;
  @Action("timeular/getEntries") getEntries!: (date: {startDate: Date, endDate: Date}) => Promise<void>;

  get start() {
    return this.startDate.toISOString().split("T")[0];
  }

  get end() {
    return this.endDate.toISOString().split("T")[0];
  }

  get timeEntries(){
    return this.entries.map(entry => ({
      ...entry,
      timeularActivity: this.activitiesMap[entry.activityId],
      runnProject: this.projectsMap[this.projectsMapping[entry.activityId]] ?? null,
    }));
  }


  setStartDate(event: any) {
    console.log(event.target.value);
    const date = new Date(event.target?.value);

    this.$store.commit("setStartDate", date);
  }

  setEndDate(event: any) {
    console.log(event.target.value);
    const date = new Date(event.target?.value);

    this.$store.commit("setEndDate", date);
  }

  async getEntriesBetweenDates(){
    await this.$store.dispatch('startLoading', 'Getting entries');
    await Promise.all([
      this.loadActivities(),
      this.loadProjects(),
      this.getEntries({startDate: this.startDate, endDate: this.endDate})
    ]);
    await this.$store.dispatch('endLoading');
  }

}
</script>

<style scoped>

</style>
