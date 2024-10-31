import React from 'react';
import { Link, Globe, Trash2 } from 'lucide-react';
import { WEBHOOK_CONFIG, WEBHOOK_TEMPLATES } from '../../constants/webhooks';

const WebhookSettings: React.FC = () => {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Webhooks</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Configure integrações com sistemas externos
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          Novo Webhook
        </button>
      </div>
      <div className="border-t border-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-medium text-gray-900">Configuração Global</h4>
              <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Versão da API</dt>
                  <dd className="mt-1 text-sm text-gray-900">{WEBHOOK_CONFIG.payloadVersion}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Timeout</dt>
                  <dd className="mt-1 text-sm text-gray-900">{WEBHOOK_CONFIG.timeout}ms</dd>
                </div>
              </dl>
            </div>

            <div className="space-y-4">
              {Object.entries(WEBHOOK_TEMPLATES).map(([event, config]) => (
                <div key={event} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{config.title}</h4>
                      <p className="mt-1 text-sm text-gray-500">{config.description}</p>
                    </div>
                    <div className="flex space-x-4">
                      <button className="text-gray-400 hover:text-gray-500">
                        <Globe className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <Link className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebhookSettings;