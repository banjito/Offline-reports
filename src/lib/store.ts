import { get, set, del, keys } from 'idb-keyval';
import { ReportDraft } from '../types';

const DRAFT_PREFIX = 'draft:';

export const saveDraft = async (draft: ReportDraft): Promise<void> => {
  await set(`${DRAFT_PREFIX}${draft.draftId}`, draft);
};

export const getDraft = async (draftId: string): Promise<ReportDraft | undefined> => {
  return await get(`${DRAFT_PREFIX}${draftId}`);
};

export const getAllDrafts = async (): Promise<ReportDraft[]> => {
  const allKeys = await keys();
  const draftKeys = allKeys.filter(key => 
    typeof key === 'string' && key.startsWith(DRAFT_PREFIX)
  ) as string[];
  
  const drafts: ReportDraft[] = [];
  for (const key of draftKeys) {
    const draft = await get(key);
    if (draft) {
      drafts.push(draft);
    }
  }
  
  return drafts.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
};

export const deleteDraft = async (draftId: string): Promise<void> => {
  await del(`${DRAFT_PREFIX}${draftId}`);
};