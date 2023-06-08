import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type Props = {
  columns?: string[];
  rows?: (string | ReactNode | undefined)[][];
};

const TableFrame: React.FC<Props> = ({ columns, rows }) => {
  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              {columns?.map((column, index) => (
                <Th key={index}>{column}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {rows?.map((values, index) => (
              <Tr key={index}>
                {values?.map((value, index) => (
                  <Td key={index}>{value ?? ''}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableFrame;
