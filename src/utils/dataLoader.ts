
import { Project, Experience, Hobby } from '../types';

export const loadProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch('/src/data/projects.json');
    return await response.json();
  } catch (error) {
    console.error('Failed to load projects:', error);
    return [];
  }
};

export const loadExperience = async (): Promise<Experience[]> => {
  try {
    const response = await fetch('/src/data/experience.json');
    return await response.json();
  } catch (error) {
    console.error('Failed to load experience:', error);
    return [];
  }
};

export const loadHobbies = async (): Promise<Hobby[]> => {
  try {
    const response = await fetch('/src/data/hobbies.json');
    return await response.json();
  } catch (error) {
    console.error('Failed to load hobbies:', error);
    return [];
  }
};

export const loadMarkdown = async (filePath: string): Promise<string> => {
  try {
    const response = await fetch(filePath);
    return await response.text();
  } catch (error) {
    console.error('Failed to load markdown:', error);
    return '';
  }
};
