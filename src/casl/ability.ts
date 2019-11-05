/* eslint-disable no-underscore-dangle */
import { Ability, AbilityBuilder } from '@casl/ability';
import { getResourceRoles } from '../auth/auth-service';
import { ResourceRole } from '../domain/ResourceRole';

// Defines how to detect object's type
const subjectName = item => {
  if (!item || typeof item === 'string') {
    return item;
  }
  return item.__type;
};

const defineRulesFor = (resourceRoles: ResourceRole[]) => {
  const { can, rules } = AbilityBuilder.extract();

  if (!resourceRoles) {
    return rules;
  }

  resourceRoles.forEach(resourceRole => {
    if (resourceRole.resource === 'publisher') {
      if (resourceRole.role === 'admin' || resourceRole.role === 'publish') {
        can('create', 'Concept', { publisher: resourceRole.resourceId });
        can('view', 'StatusBar', { publisher: resourceRole.resourceId });
        can('edit', ['Language', 'Field'], { publisher: resourceRole.resourceId });
      }
    }
  });

  return rules;
};

export const ability = new Ability([], { subjectName });

export const initAbilities = () => ability.update(defineRulesFor(getResourceRoles()));

/* eslint-enable no-underscore-dangle */
