import React from 'react';
import { Folder, Edit, Trash2 } from 'lucide-react';
import { DEFAULT_CATEGORIES } from '../../constants/categories';

const CategoryManagement: React.FC = () => {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Categorias</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Gerencie as categorias de chamados
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          Nova Categoria
        </button>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {DEFAULT_CATEGORIES.map((category) => (
            <li key={category.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Folder className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    <div className="text-sm text-gray-500">{category.description}</div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button className="text-gray-400 hover:text-gray-500">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="text-gray-400 hover:text-red-500">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              {category.subcategories && (
                <div className="mt-2 ml-12">
                  {category.subcategories.map((sub) => (
                    <div key={sub.id} className="mt-2 flex items-center justify-between">
                      <span className="text-sm text-gray-600">{sub.name}</span>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-gray-500">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryManagement;