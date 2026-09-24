import { FormData } from "./types";

export interface DependencyLike {
  dependsOn?: {
    questionId: string;
    value: string | string[];
  };
  hideWhen?: {
    questionId: string;
    value: string | string[];
  };
}

export function matchesDependency(
  dep: { questionId: string; value: string | string[] } | undefined,
  formData: FormData
): boolean {
  if (!dep) return true;
  const { questionId, value } = dep;
  const answer = formData[questionId];
  if (Array.isArray(answer)) {
    if (Array.isArray(value)) return value.some((v) => answer.includes(v));
    return answer.includes(value);
  }
  if (Array.isArray(value)) return value.includes(answer as string);
  return answer === value;
}

export function isNodeVisible(node: DependencyLike, formData: FormData): boolean {
  if (!matchesDependency(node.dependsOn, formData)) return false;
  if (node.hideWhen && matchesDependency(node.hideWhen, formData)) return false;
  return true;
}