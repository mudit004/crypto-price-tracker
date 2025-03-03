import { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Setup',
      items: ['setup/installation'],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/project-structure',
        'architecture/api-integration',
        'architecture/state-management',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      items: [
        'development/challenges-solutions',
      ],
    },
    {
      type: 'category',
      label: 'Components',
      items: [
        'components/crypto-card',
        'components/search-bar',
      ],
    },
  ],
};

export default sidebars;
