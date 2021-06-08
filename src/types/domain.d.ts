export interface Concept {
  id: string;
  uri: string;
  identifier: string;
  application: Record<string, string>[];
  definition: Definition;
  alternativeDefinition: Definition;
  subject: Record<string, string>;
  prefLabel: Record<string, string>;
  altLabel: Record<string, string>[];
  hiddenLabel: Record<string, string>[];
  contactPoint: ContactPoint;
  example: Record<string, string>;
}
