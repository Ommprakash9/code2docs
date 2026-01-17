import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

// POST /api/projects/:id/generate
export function useGenerateDocuments() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ projectId, types }: { projectId: number, types?: string[] }) => {
      const url = buildUrl(api.documents.generate.path, { id: projectId });
      const body = { types: types || ['README', 'BRD', 'TRD', 'TEST'] };
      
      const res = await fetch(url, {
        method: api.documents.generate.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to start generation");
      return api.documents.generate.responses[202].parse(await res.json());
    },
    onSuccess: (_, { projectId }) => {
      // Invalidate the specific project so it fetches the new document placeholders
      queryClient.invalidateQueries({ queryKey: [api.projects.get.path, projectId] });
    }
  });
}

// GET /api/documents/:id (Useful for individual polling or detail view)
export function useDocument(id: number) {
  return useQuery({
    queryKey: [api.documents.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.documents.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch document");
      return api.documents.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
    // Poll every 5 seconds if status is pending or generating
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data && (data.status === 'pending' || data.status === 'generating')) {
        return 5000;
      }
      return false;
    }
  });
}
