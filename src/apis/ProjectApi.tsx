import httpRequest from '@/http/Axios';
import { PagingResponse } from '@/types/common';
import { ProjectQueryRequest, ProjectResponse } from '@/types/project';
import { replacePathDynamic } from '@/utils/helper';

import { ApiPath } from './ApiPath';

class ProjectApi {
  async getProjectById(id: string) {
    const res = await httpRequest.get<ProjectResponse>(
      replacePathDynamic(ApiPath.projects.projectDetail, { id }),
    );
    return res.data;
  }

  async getProjectBySlug(slug: string) {
    const res = await httpRequest.get<ProjectResponse>(
      replacePathDynamic(ApiPath.projects.projectDetailBySlug, { slug }),
    );
    return res.data;
  }

  async getProjects(query: ProjectQueryRequest = {}) {
    const res = await httpRequest.get<PagingResponse<ProjectResponse>>(
      ApiPath.projects.projectPage,
      {
        params: query,
      },
    );
    return res.data;
  }
}

export default new ProjectApi();
