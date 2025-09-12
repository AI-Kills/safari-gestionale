'use client';

import { useSpinnerContext } from "@/app/context/spinner-context";
import { addFundamentalEntity, DBResult, setOptionsJson, ApiResponse } from "@/app/lib/actions/actions";
import Feedback from "@/app/ui/feedback/feedback";
import InputSelect from "@/app/ui/inputs/input-select";
import InputText from "@/app/ui/inputs/input-text";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon, CircleStackIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function AggiungiPage() {
    const aggiungiOptions = [
        { name: 'Fornitore', value: 'fornitori' },
        { name: 'Banca', value: 'banche' },
        { name: 'Destinazione', value: 'destinazioni' },
        //{ name: 'brand', value: 'brand' },
        //{ name: 'operatore', value: 'operatori' },
        //{ name: 'tipo cliente', value: 'tipi cliente' },
        //{ name: 'provenienza cliente', value: 'provenienze cliente' },
        //{ name: 'valuta', value: 'valute' }
    ];

    const [newEntity, setNewEntity] = useState<{ tableName?: string, value?: string }>({});
    
    const onSelectedOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewEntity(val => ({ ...val, tableName: e.target.value }));
    };
    
    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEntity(val => ({ ...val, value: e.target.value }));
    };

    // feedback
    const { setIsActiveSpinner, isActiveSpinner } = useSpinnerContext();
    const [feedback, setFeedback] = useState<ApiResponse<any> | null>(null);
    
    const addEntity = async () => {
        if (!newEntity.tableName || !newEntity.value) return;
        
        setFeedback(null);
        setIsActiveSpinner(true);
        const result = await addFundamentalEntity(newEntity.tableName, newEntity.value);
        setIsActiveSpinner(false);
        
        setTimeout(() => {
            setFeedback(result);
        }, 200);
        
        await setOptionsJson({});
        
        if (result.success) {
            // Reset form on success
            setNewEntity({});
            setTimeout(() => {
                setFeedback(null);
            }, 2200);
        }
    };

    const isFormValid = newEntity?.tableName && newEntity?.value?.trim();
    const selectedOption = aggiungiOptions.find(opt => opt.value === newEntity?.tableName);

    useEffect(() => {
        console.log('the newEntity: ', newEntity);
    }, [newEntity]);

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <CircleStackIcon className="w-8 h-8 text-green-600" />
                        Aggiungi Entità
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Aggiungi nuove entità fondamentali al sistema per gestire fornitori, banche e destinazioni.
                    </p>
                </div>
                <Badge variant="secondary" className="hidden md:flex">
                    Database Management
                </Badge>
            </div>

            {/* Main Form Card */}
            <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-brown-50 rounded-t-lg">
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <PlusIcon className="w-5 h-5 text-green-600" />
                        Nuova Entità
                    </CardTitle>
                    <CardDescription>
                        Seleziona il tipo di entità e inserisci il valore da aggiungere al database.
                    </CardDescription>
                </CardHeader>
                
                <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                            <InputSelect
                                label="Tipo Entità"
                                name="aggiungi-entity"
                                value={newEntity?.tableName || ''}
                                options={aggiungiOptions}
                                onChange={onSelectedOption}
                            />
                            {selectedOption && (
                                <p className="text-sm text-gray-500">
                                    Aggiungendo a: <span className="font-medium">{selectedOption.name}</span>
                                </p>
                            )}
                        </div>
                        
                        <div className="space-y-2">
                            <InputText
                                label="Valore"
                                name="valore"
                                value={newEntity?.value || ''}
                                onChange={onValueChange}
                                placeholder={`Inserisci il nome ${selectedOption ? `del ${selectedOption.name.toLowerCase()}` : 'dell\'entità'}`}
                            />
                            <p className="text-sm text-gray-500">
                                Il nome deve essere unico e descrittivo
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button 
                            onClick={addEntity}
                            disabled={!isFormValid || isActiveSpinner}
                            size="lg"
                            className="min-w-[140px] group"
                        >
                            {isActiveSpinner ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                    Aggiungendo...
                                </>
                            ) : (
                                <>
                                    <PlusIcon className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                                    Aggiungi Entità
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Feedback Section */}
            {feedback && (
                <Card className={`border-l-4 ${feedback.success ? 'border-l-green-500 bg-green-50' : 'border-l-red-500 bg-red-50'}`}>
                    <CardContent className="p-4">
                        <Feedback<any> result={{
                            success: feedback.success,
                            values: feedback.data,
                            errors: {},
                            errorsMessage: feedback.error || ''
                        }} />
                    </CardContent>
                </Card>
            )}

            {/* Available Options Info */}
            <Card className="bg-gray-50 border-gray-200">
                <CardHeader>
                    <CardTitle className="text-lg">Entità Disponibili</CardTitle>
                    <CardDescription>
                        Tipi di entità che puoi aggiungere al sistema
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {aggiungiOptions.map((option, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="font-medium text-gray-700">{option.name}</span>
                                <Badge variant="outline" className="text-xs">
                                    {option.value}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
