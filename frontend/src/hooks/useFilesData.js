import { useEffect, useState } from 'react';
import { fetchFilesList, fetchFilesData } from '../api';

export function useFilesData(selectedFile) {
  const [files, setFiles] = useState([]);
  const [rows, setRows] = useState([]);
  const [activeFileName, setActiveFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [error, setError] = useState('');

  // lista de archivos
  useEffect(() => {
    async function loadFiles() {
      try {
        setLoadingFiles(true);
        const data = await fetchFilesList();
        setFiles(data.files || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingFiles(false);
      }
    }
    loadFiles();
  }, []);

  // datos de /files/data
  useEffect(() => {
    async function loadData() {
      try {
        setError('');
        setRows([]);
        setActiveFileName('');
        setLoading(true);

        const data = await fetchFilesData(selectedFile);

        const flatRows = [];
        data.forEach((fileObj) => {
          fileObj.lines.forEach((line, idx) => {
            flatRows.push({
              ...line,
              file: fileObj.file,
              id: `${fileObj.file}-${idx}`
            });
          });
        });

        setRows(flatRows);
        if (data[0]?.file) {
          setActiveFileName(data[0].file);
        }
      } catch (err) {
        console.error(err);
        setError('Error loading data. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [selectedFile]);

  return {
    files,
    rows,
    activeFileName,
    loading,
    loadingFiles,
    error
  };
}
