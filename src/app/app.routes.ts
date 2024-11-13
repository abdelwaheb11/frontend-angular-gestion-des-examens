import { Routes } from '@angular/router';
import { ExamensComponent } from './examens/examens.component';
import { AddExamensComponent } from './add-examens/add-examens.component';
import { UpdateExamenComponent } from './update-examen/update-examen.component';
import { SearchExamenMatiereComponent } from './search-examen-matiere/search-examen-matiere.component';
import { SearchExamenEtudiantComponent } from './search-examen-etudiant/search-examen-etudiant.component';
import { MatieresComponent } from './matieres/matieres.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ProduitGuard } from './guard/examen.guard';
import { LoginGuard } from './guard/login.guard';
import { InscritComponent } from './inscrit/inscrit.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import { ViewExamenComponent } from './view-examen/view-examen.component';

export const routes: Routes = [
    {path: '', redirectTo: '/examen', pathMatch: 'full'},
    {path :'examen',component:ExamensComponent , canActivate:[LoginGuard]},
    {path :'newExamen',component:AddExamensComponent , canActivate:[ProduitGuard,LoginGuard]},
    {path :'editExamen/:id',component:UpdateExamenComponent, canActivate:[ProduitGuard,LoginGuard]},
    {path :'search/parMatiere',component:SearchExamenMatiereComponent, canActivate:[LoginGuard]},
    {path :'search/parEtudiant',component:SearchExamenEtudiantComponent, canActivate:[LoginGuard]},
    {path :'matieres',component:MatieresComponent, canActivate:[LoginGuard]},
    {path :'login',component:LoginComponent},
    {path: 'forbidden', component: ForbiddenComponent},
    {path: 'inscrit', component: InscritComponent},
    { path: 'verifEmail', component: VerifEmailComponent },
    { path: 'viewExamen/:id', component: ViewExamenComponent , canActivate:[LoginGuard]},
];
