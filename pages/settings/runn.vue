<template>
  <div>
    <div>Runn's Person ID: {{ personId }}</div>
    <div>
      Your Role
      <select :value="roleId" @input="changeRoleId($event.target.value)">
        <option>None</option>
        <option
          v-for="role in roles"
          :key="role.id"
          :value="role.id"
          :label="role.name"
        />
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { Action, Component, Getter, Vue } from 'nuxt-property-decorator';
import { Role } from '~/functions/src/runn/runn.models';
import { User } from '~/functions/src/users/user.model';

@Component
export default class Runn extends Vue {
  @Action('runn/loadRoles') loadRoles!: () => Promise<any>;
  @Getter('runn/roles') roles!: Role[];
  @Getter('user/user') user!: User;
  @Action('user/updateUser') updateUser!: (user: Partial<User>) => Promise<any>;
  @Action('runn/updatePersonId') updatePersonId!: () => Promise<any>;

  mounted() {
    this.loadRoles();

    if (!this.user.runn?.personId) {
      this.updatePersonId();
    }
  }

  get roleId() {
    return this.user?.runn?.roleId ?? '';
  }

  get personId() {
    return this.user?.runn?.personId ?? '';
  }

  changeRoleId(roleId: string) {
    this.updateUser({
      runn: {
        personId: this.user.runn?.personId ?? '',
        roleId,
      },
    });
  }
}
</script>

<style scoped></style>
