import { BaseComponentComponent } from './../base-component/base-component.component';
import { Component } from '@angular/core';


export abstract class BaseSkillComponent extends BaseComponentComponent{
public abstract handleEdit(data:any);
}
