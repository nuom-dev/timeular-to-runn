<template>
  <li class="p-2 border border-warm-gray-300 rounded-lg shadow m-1" :class="{'bg-brand-primary-light': entry.saved, 'bg-white': !entry.saved}">
    <div>
      <span>Start: {{(new Date(entry.duration.startedAt)).toLocaleString()}}</span>
      <span>End: {{(new Date(entry.duration.stoppedAt)).toLocaleString()}}</span>
    </div>
    <div>
      <span>Duration: {{duration}} hours</span>
    </div>
    <div>
      <h2 v-if="entry.timeularActivity">Timeular Activity: {{entry.timeularActivity.name}}</h2>
      <h2 v-if="entry.runnProject">Runn project: {{entry.runnProject.client_name}} - {{entry.runnProject.name}}</h2>
      <div
        v-if="entry.note.text || entry.note.tags.length || entry.note.mentions.length"
        class="m-1 bg-gray-50 p-1 rounded-lg"
      >
        <h3>Notes:</h3>
        <p>{{entry.note.text}}</p>
        <ul><li v-for="tag of entry.note.tags" :key="tag.id">{{tag.label}}</li></ul>
        <ul><li v-for="mention of entry.note.mentions" :key="mention.id">{{mention.label}}</li></ul>
      </div>
    </div>
    <div>
      <i class="material-icons cursor-pointer" @click="saveEntryToRun">add</i> Save to Runn
    </div>
  </li>
</template>

<script lang="ts">

import {Component, Vue, Prop, Action} from "nuxt-property-decorator";
import dayjs from "dayjs";
import {Activity, Entry} from "~/functions/src/timeular/timeular.models";
import {Project} from "~/functions/src/runn/runn.models";

@Component
export default class EntryBlock extends Vue {
  @Prop({required: true}) entry!: Entry & {
    timeularActivity: Activity;
    runnProject: Project | null;
  }
  @Action("runn/saveEntry") saveEntry!: (entry: Entry) => void;

  get duration() {
    const hours = dayjs(this.entry.duration.stoppedAt).diff(dayjs(this.entry.duration.startedAt), "hours" );
    const minutes = dayjs(this.entry.duration.stoppedAt).diff(dayjs(this.entry.duration.startedAt), "minutes" ) % 60;
    return hours + ':' + minutes;
  }

  saveEntryToRun() {
    this.saveEntry(this.entry);
  }
}
</script>

<style scoped>

</style>
