<template>
  <div class="container p-8">
    <h1>Map your Timeular Activities to Runn projects</h1>
    <ul class="mt-4 w-full md:w-1/2">
      <li
        v-for="activity in activities"
        :key="activity.name"
        class="flex items-center justify-between"
      >
        <span>{{ activity.name }}</span>
        <select
          :value="projectsMapping[activity.id]"
          @input="updateProjectsMapping(activity.id, $event.target.value)"
        >
          <option>No mapping</option>
          <option
            v-for="option in projects"
            :key="option.id"
            :value="option.id"
            :label="option.client_name + ' - ' + option.name"
          />
        </select>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Action, Component, Getter, Vue } from 'nuxt-property-decorator';
import { Project } from '~/functions/src/runn/runn.models';
import { Activity } from '~/functions/src/timeular/timeular.models';

@Component
export default class settings extends Vue {
  @Getter('timeular/activities') activities!: Activity[];
  @Getter('runn/projects') projects!: Project[];
  @Getter('user/projectsMapping') projectsMapping!: Record<string, string>;
  @Action('timeular/loadActivities') loadActivities!: () => void;
  @Action('runn/loadProjects') loadProjects!: () => void;
  @Action('user/updateProjectsMapping') updateProjectsMappingAction!: (data: {
    activityId: string;
    projectId: string;
  }) => void;

  mounted() {
    this.loadActivities();
    this.loadProjects();
  }

  updateProjectsMapping(activityId: string, projectId: string) {
    console.log({ activityId, projectId });
    this.updateProjectsMappingAction({ activityId, projectId });
  }
}
</script>

<style scoped></style>
