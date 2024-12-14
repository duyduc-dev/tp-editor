import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuPlus } from 'react-icons/lu';

import ProjectApi from '@/apis/ProjectApi';
import Modal, { ModalRef } from '@/components/Modal';
import Text from '@/components/Text';
import { ProjectResponse } from '@/types/project';

import ProjectCardItem from '../ProjectCardItem';
import { WrapperButton } from './styled';

const NewProject = () => {
  const { t } = useTranslation();

  const modalRef = useRef<ModalRef>(null);

  const [projectTemplate, setProjectTemplate] = useState<ProjectResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const handleOpenTemplate = async () => {
    try {
      setLoading(true);
      const res = await ProjectApi.getProjects({ isTemplate: true });
      setProjectTemplate(res.content);
      setLoading(false);
      modalRef.current?.open();
    } catch (error) {
      console.log(`handleOpenTemplate ~ error:`, error);
      setLoading(false);
    }
  };

  return (
    <>
      <WrapperButton loading={loading} onClick={handleOpenTemplate}>
        <LuPlus size={18} />
        <Text fontSize="sm">{t`newProject`}</Text>
      </WrapperButton>
      <Modal ref={modalRef}>
        {projectTemplate.map((item) => (
          <ProjectCardItem key={item.id} data={item} />
        ))}
      </Modal>
    </>
  );
};

export default NewProject;
