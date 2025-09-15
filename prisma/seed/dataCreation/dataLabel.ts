import { data_label } from '@prisma/client';
import { prisma } from '..';
import allLabels from '../referenceDataLabels';

const createDataLabel = async (): Promise<data_label[]> => {
  const dataLabels: data_label[] = [];

  for (let i = 0; i < allLabels.length; i++) {
    const id = allLabels[i].id;
    dataLabels.push(
      await prisma.data_label.upsert({
        where: { id },
        update: {},
        create: {
          id,
          label: allLabels[i].label,
        },
      }),
    );
  }

  return dataLabels;
};

export default createDataLabel;
